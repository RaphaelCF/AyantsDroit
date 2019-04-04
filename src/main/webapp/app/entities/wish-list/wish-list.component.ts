import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWishList } from 'app/shared/model/wish-list.model';
import { AccountService } from 'app/core';
import { WishListService } from './wish-list.service';

@Component({
    selector: 'jhi-wish-list',
    templateUrl: './wish-list.component.html'
})
export class WishListComponent implements OnInit, OnDestroy {
    wishLists: IWishList[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected wishListService: WishListService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.wishListService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IWishList[]>) => res.ok),
                    map((res: HttpResponse<IWishList[]>) => res.body)
                )
                .subscribe((res: IWishList[]) => (this.wishLists = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.wishListService
            .query()
            .pipe(
                filter((res: HttpResponse<IWishList[]>) => res.ok),
                map((res: HttpResponse<IWishList[]>) => res.body)
            )
            .subscribe(
                (res: IWishList[]) => {
                    this.wishLists = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWishLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWishList) {
        return item.id;
    }

    registerChangeInWishLists() {
        this.eventSubscriber = this.eventManager.subscribe('wishListListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
