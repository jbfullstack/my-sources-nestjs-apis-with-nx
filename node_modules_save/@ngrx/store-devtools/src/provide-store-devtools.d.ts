import { InjectionToken } from '@angular/core';
import { ReduxDevtoolsExtension } from './extension';
import { StoreDevtoolsConfig, StoreDevtoolsOptions } from './config';
import { EnvironmentProviders } from '@ngrx/store';
export declare const IS_EXTENSION_OR_MONITOR_PRESENT: InjectionToken<boolean>;
export declare function createIsExtensionOrMonitorPresent(extension: ReduxDevtoolsExtension | null, config: StoreDevtoolsConfig): boolean;
export declare function createReduxDevtoolsExtension(): any;
/**
 * Provides developer tools and instrumentation for `Store`.
 *
 * @usageNotes
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideStoreDevtools({
 *       maxAge: 25,
 *       logOnly: environment.production,
 *     }),
 *   ],
 * });
 * ```
 */
export declare function provideStoreDevtools(options?: StoreDevtoolsOptions): EnvironmentProviders;
