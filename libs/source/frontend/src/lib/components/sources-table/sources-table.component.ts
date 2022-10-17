import { trigger, state, style, transition, animate } from '@angular/animations';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SourceInterface, TagInterface } from '@jbhive/types_fe';
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
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SourceTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['owner', 'title', 'date', 'tags'];
  dataSource!: MatTableDataSource<SourceInterface>;
  sources!: SourceInterface[];

  paginatorSize!: number
  pageEvent!: PageEvent
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filteredSources$ = this.sourceStore.filteredSources$
  filteredPaginatorSources: SourceInterface[] = []

  constructor(private store: Store, private sourceStore: SourceStore) {}

  ngOnInit(): void {
    this.filteredSources$.pipe().subscribe( sources => {
      
      this.sources = sources
      this.filteredPaginatorSources = this.loadSourcesPage()
      this.dataSource = new MatTableDataSource<SourceInterface>( this.filteredPaginatorSources);
      this.paginatorSize = sources.length
    })
    
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap( () => {
        console.log('paginator tap -> pageIndex: ', this.paginator?.pageIndex)
        console.log('paginator tap -> pageSize: ', this.paginator?.pageSize)
        this.filteredPaginatorSources =this.loadSourcesPage()
        this.dataSource = new MatTableDataSource<SourceInterface>( this.filteredPaginatorSources);
      })
    ).subscribe()
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
}
