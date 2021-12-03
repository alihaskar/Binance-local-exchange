import { Container } from 'inversify';
import { BinanceService } from './services/binance.service';
import { ExchangeInfoService } from './services/exchangeInfo.service';
import { OrderService } from './services/order.service';
import { BaseOrderMatcher } from './services/orderMatchers/baseOrderMatcher';
import { LimitOrderMatcher } from './services/orderMatchers/limitOrder.matcher';
import { MarketOrderMatcher } from './services/orderMatchers/marketOrder.matcher';
import { OrderMatchingService } from './services/orderMatching.service';
import { ExchangeInfoQuery } from './store/exchangeInfo.query';
import { ExchangeInfoStore } from './store/exchangeInfo.store';
import { OrderQuery } from './store/order.query';
import { OrderStore } from './store/order.store';
import { UserDataStore } from './store/userData.store';
import { KlineEventHandler } from './websocket/eventHandlers/kline';
import { UserDataStreamEventHandler } from './websocket/eventHandlers/userDataStream';
import { WEBSOCKET_EVENT_HANDLER, WebsocketEventHandler } from './websocket/websocketEventHandler';

const container = new Container({
  skipBaseClassChecks: true,
  autoBindInjectable: true
});

container.bind<BaseOrderMatcher>(BaseOrderMatcher).to(MarketOrderMatcher);
container.bind<BaseOrderMatcher>(BaseOrderMatcher).to(LimitOrderMatcher);

container.bind<WebsocketEventHandler>(WEBSOCKET_EVENT_HANDLER).to(KlineEventHandler);
container.bind<WebsocketEventHandler>(WEBSOCKET_EVENT_HANDLER).to(UserDataStreamEventHandler);

container.bind<OrderService>(OrderService).toSelf().inSingletonScope();
container.bind<OrderMatchingService>(OrderMatchingService).toSelf().inSingletonScope();
container.bind<BinanceService>(BinanceService).toSelf().inSingletonScope();
container.bind<ExchangeInfoService>(ExchangeInfoService).toSelf().inSingletonScope();

// Query
container.bind<OrderQuery>(OrderQuery).toSelf();
container.bind<ExchangeInfoQuery>(ExchangeInfoQuery).toSelf();

// Stores
container.bind<OrderStore>(OrderStore).toSelf().inSingletonScope();
container.bind<UserDataStore>(UserDataStore).toSelf().inSingletonScope();
container.bind<ExchangeInfoStore>(ExchangeInfoStore).toSelf().inSingletonScope();


export default container;
