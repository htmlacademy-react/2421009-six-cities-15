import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

export default function Page404Screen() {
  return (
    <main className="page__main">
      <div className="container">
        <h1>Ошибка 404. Страница не существует.</h1>
        <p><Link to={AppRoute.Root}>Вернуться на главную</Link></p>
      </div>
    </main>
  );
}
