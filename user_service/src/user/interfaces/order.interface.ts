import { Observable } from 'rxjs';

export interface IOrderService {
  createOrder(data: { message: string }): Observable<{ message: string }>;
}
