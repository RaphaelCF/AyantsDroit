import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'category',
                loadChildren: './category/category.module#AyantsDroitCategoryModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#AyantsDroitProductModule'
            },
            {
                path: 'customer',
                loadChildren: './customer/customer.module#AyantsDroitCustomerModule'
            },
            {
                path: 'address',
                loadChildren: './address/address.module#AyantsDroitAddressModule'
            },
            {
                path: 'wish-list',
                loadChildren: './wish-list/wish-list.module#AyantsDroitWishListModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyantsDroitEntityModule {}
