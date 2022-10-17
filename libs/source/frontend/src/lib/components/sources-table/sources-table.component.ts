import { trigger, state, style, transition, animate } from '@angular/animations';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { currentUserSelector } from '@jbhive/auth_fe';
import { Role, SourceInterface, TagInterface } from '@jbhive/types_fe';
import { select, Store } from '@ngrx/store';
import { first, tap } from 'rxjs';
import { filteredSourcesSelector, sourceSelector } from '../../store/selectors/source.selector';
import { SourceStore } from '../../store/source.store';



@Component({
  selector: 'ms-sources-table',
  styleUrls: ['sources-table.component.scss'],
  templateUrl: 'sources-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class SourceTableComponent implements OnInit, AfterViewInit {
  @Input() searchParent: string = '';

  displayedColumns: string[] = ['owner', 'title', 'date', 'tags', 'type'];
  displayedColumnswithExpand: string[] = [...this.displayedColumns, 'expand'];
  expandedElement!: SourceInterface | null;
  dataSource!: MatTableDataSource<SourceInterface>;
  sources!: SourceInterface[];

  paginatorSize!: number
  pageEvent!: PageEvent
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filteredSources$ = this.sourceStore.filteredSources$
  filteredPaginatorSources: SourceInterface[] = []

  // --- owned source
  loggedUserId!: number
  loggedUserRoleId: number = 0

  constructor(private store: Store, private sourceStore: SourceStore) {}

  ngOnInit(): void {

    this.store.pipe(select(currentUserSelector)).subscribe( {
      next: (user) => {
          if (user) {
              
              this.loggedUserId = user.id
              this.loggedUserRoleId = (user.role.id === null)? 0 : user.role.id
          }             
      }
  })

    this.filteredSources$.pipe().subscribe( sources => {      
      this.sources = sources
      this.filteredPaginatorSources = this.loadSourcesPage()
      this.dataSource = new MatTableDataSource<SourceInterface>( this.filteredPaginatorSources);
      this.paginatorSize = sources.length
    })
    
  }

  isOwnedByLoggedUser(source : SourceInterface){
    return (this.loggedUserId === source.owner.id)
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap( () => {
        console.log('paginator tap -> pageIndex: ', this.paginator?.pageIndex)
        console.log('paginator tap -> pageSize: ', this.paginator?.pageSize)
        this.filteredPaginatorSources = this.loadSourcesPage()
        this.dataSource = new MatTableDataSource<SourceInterface>( this.filteredPaginatorSources);
      })
    ).subscribe()

    // this.expandedElement = this.filteredPaginatorSources[0]
  }

  printTagList(tags: TagInterface[]){   
    if (tags.length === 0){
      return 'No tag'
    } else {
      let res = ''
      for (var tag of tags){
        res += tag.title + ', '
      }
      res = res.slice(0, -2)
      return res
    }
  }

  getPaginatedSources(event : any) {
    this.filteredPaginatorSources = this.loadSourcesPage()
    this.dataSource = new MatTableDataSource<SourceInterface>( this.filteredPaginatorSources);
    return event
  }

  loadSourcesPage(): SourceInterface[] {
      const page_number: number = (this.paginator?.pageIndex)? this.paginator.pageIndex : 0
      const page_size: number = (this.paginator?.pageSize)? this.paginator.pageSize : 5
      const paginatedSources: SourceInterface[] = this.sources.slice((page_number ) * page_size, (page_number+1) * page_size)  
      return paginatedSources
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  hasDescription(source: SourceInterface){
    if (source && source.description && source.description !== ''){
      return true
    } else {
      return false
    }
  }

  description(source: SourceInterface){
    if (source && source.description && source.description !== ''){
      return source.description
    } else {
      return 'N/A'
    }
  }

  hasContent(source: SourceInterface){
    if (source && source.content && source.content !== ''){
      return true
    } else {
      return false
    }
  }

  content(source: SourceInterface){
    if (source && source.content && source.content !== ''){
      return source.content
    } else {
      return 'N/A'
    }
  }

  hasUrl(source: SourceInterface){
    if (source && source.url && source.url !== ''){
      return true
    } else {
      return false
    }
  }

  url(source: SourceInterface){
    if (source && source.url && source.url !== ''){
      return source.url
    } else {
      return 'N/A'
    }
  }

  title(source: SourceInterface){
    if (source && source.title && source.title !== ''){
      return source.title
    } else {
      return 'N/A'
    }
  }

  ownerPseudo(source : SourceInterface){
    if (source && source.owner.pseudo && source.owner.pseudo !== ''){
      return source.owner.pseudo
    } else {
      return 'N/A'
    }
  }

  isOwnedByLogedUser(source : SourceInterface){
    if (source){
        if (source.owner.id === this.loggedUserId){
            return true
        }
    }

    return false
  }

  isLoggedUserAtLeastAdmin(){
    return (this.loggedUserRoleId >= Role.Admin)
  }

  sortData(sort: Sort) {

    const data = this.loadSourcesPage().slice();
    
    console.log('sortData()')

    if (!sort.active || sort.direction === '') {
      
      this.dataSource = new MatTableDataSource<SourceInterface>( data);
      return;
    }

    console.log('sort.active: ', sort.active)
    console.log('sort.direction: ', sort.direction)

    const sorted: SourceInterface[] = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'owner':
          return compare(a.owner.pseudo, b.owner.pseudo, isAsc);
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'date':
          return compare(a.createdAt, b.createdAt, isAsc);
        case 'type':
          return compare(a.type.title, b.type.title, isAsc);
        case 'tags':
          return compare(a.tags.length, b.tags.length, isAsc);
        default:
          return 0;
      }
    });

    this.dataSource = new MatTableDataSource<SourceInterface>( sorted);
    return 
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
  

