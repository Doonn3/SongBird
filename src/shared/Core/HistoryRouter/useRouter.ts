import { HistoryRouter } from './HistoryRouter';

export function useRouter(to: string) {
  HistoryRouter.Instance.LinkTo(to);
}
