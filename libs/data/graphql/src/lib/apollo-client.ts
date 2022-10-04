
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context';
import { HttpHeaders } from '@angular/common/http'


export const middleware = new ApolloLink((operation, forward) => {
    const token ='ey...'
    if (token) {
        operation.setContext({
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        });
    }
    return forward(operation);
});
