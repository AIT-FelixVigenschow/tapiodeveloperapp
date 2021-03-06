import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SourceKeys } from './source-keys.model';
import { AssignedMachine } from '../shared/models/assigned-machine.model';
import { SubscriptionsOverview } from '../shared/models/subscription-overview.model';

/**
 * Provides access to the tapio subscriptions.
 */
@Injectable()
export class HistoricalDataService {
    constructor(private readonly http: HttpClient) {}

    public getSourceKeys(machineId: string): Observable<SourceKeys> {
        return this.http
            .get<SourceKeys>(`/api/historicalData/${machineId}`);
    }

    public getMachines(): Observable<AssignedMachine[]> {
        return this.http
            .get<SubscriptionsOverview>("/api/machineOverview/")
            .pipe(
                map(overview => {
                    return [].concat(
                        ...overview.subscriptions.map(
                            subscription => subscription.assignedMachines
                        )
                    );
                })
            );
    }
}
