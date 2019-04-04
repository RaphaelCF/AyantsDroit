import { NgModule } from '@angular/core';

import { AyantsDroitSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [AyantsDroitSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [AyantsDroitSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class AyantsDroitSharedCommonModule {}
