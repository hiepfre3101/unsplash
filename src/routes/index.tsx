import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout/DefaultLayout';
import HomePage from '../pages/HomePage/HomePage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import TopicPage from '../pages/TopicPage/TopicPage';
import PhotoResultPage from '../pages/PhotoResultPage/PhotoResultPage';
import ResultLayout from '../layout/ResultLayout/ResultLayout';
import CollectionResultPage from '../pages/CollectionResultPage/CollectionResultPage';
import DetailCollection from '../pages/DetailCollection/DetailCollection';
import UserResultPage from '../pages/UserResultPage/UserResultPage';
import UserProfile from '../layout/UserProfileLayout/UserProfile';
import UserPhoto from '../pages/UserPhoto/UserPhoto';
import UserLike from '../pages/UserLike/UserLike';
import UserCollection from '../pages/UserCollection/UserCollection';

export const route = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout />,
      children: [
         {
            path: '//',
            element: <HomePage />,
            errorElement: <ErrorPage />
         },
         {
            path: '/:topic',
            element: <TopicPage />,
            errorElement: <ErrorPage />
         }
      ]
   },
   {
      path: '/s',
      element: <ResultLayout />,
      errorElement: <ErrorPage />,
      children: [
         {
            path: '/s/photos/:query',
            errorElement: <ErrorPage />,
            element: <PhotoResultPage />
         },
         {
            path: '/s/collections/:query',
            errorElement: <ErrorPage />,
            element: <CollectionResultPage />
         },
         {
            path: '/s/users/:query',
            errorElement: <ErrorPage />,
            element: <UserResultPage />
         }
      ]
   },
   {
      path: '/collections/:id',
      element: <DetailCollection />,
      errorElement: <ErrorPage />
   },
   {
      path: '/user/:username',
      element: <UserProfile />,
      errorElement: <ErrorPage />,
      children: [
         {
            path: '/user/:username/',
            element: <UserPhoto />,
            errorElement: <ErrorPage />
         },
         {
            path: '/user/:username/likes',
            element: <UserLike />,
            errorElement: <ErrorPage />
         },
         {
            path: '/user/:username/collections',
            element: <UserCollection />,
            errorElement: <ErrorPage />
         }
      ]
   }
]);
