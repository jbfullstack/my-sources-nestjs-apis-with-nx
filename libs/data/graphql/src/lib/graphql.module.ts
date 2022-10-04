import { HttpHeaders } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";

const uri = "http://localhost:3000/graphql"; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink) {

  return {
    link: httpLink.create({ 
      uri: uri,
      headers: new HttpHeaders().set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGVJZCI6MCwiaWF0IjoxNjY0OTAyOTk1LCJleHAiOjE2NjQ5MDY1OTV9.tyHyUpLJNtC6eG3v3MHRsh6C1AH5S3LKk_a5NsqPvj8`)
    }),
    cache: new InMemoryCache(),
    
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}