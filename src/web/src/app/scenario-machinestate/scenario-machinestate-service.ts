import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Provides access to the tapio machine state.
 */
@Injectable({ providedIn: 'root' })
export class MachineStateService {

    constructor(private http: HttpClient) { }

    getMachines(): Observable<AssignedMachine[]> {
        return this.http.get<SubscriptionsOverview>('/api/machineOverview/').pipe(map(overview => {
            return [].concat(...overview.subscriptions.map(subscription => subscription.assignedMachines));
        }));
    }

    getMachineState(machineId: string): Observable<LastKnownState> {
         return this.http.get<LastKnownState>('/api/machineState/' + machineId);
    }
}

/***
 * Provides an overview of the subscriptions
 */
export interface SubscriptionsOverview {
    subscriptions: Subscription[];
}

/***
 * Provides a single subscription.
 */
export interface Subscription {
    assignedMachines: AssignedMachine[];
}

export interface AssignedMachine {
    tmid: string;
    displayName: string;
}

export interface LastKnownState {
    tmid: string;
    itds: ItemData[];
    conds: any[];
}

export interface ItemData {
    p: string;
    k: string;
    vt: string;
    v: number;
    u: string;
    q: string;
    sts: string;
    rts: string;
}
