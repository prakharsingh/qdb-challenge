import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

import { Pages } from '../../types/pages';
import Dashboard from '../../views/dashboard';
import Report from '../../views/report';
import NotFound from '../../views/not-found';

export default () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.Root);

  useEffect(() => {
    switch (location.pathname) {
      case `/${Pages.Dashboard}`:
        return setCurrentPage(Pages.Dashboard);
      case `/${Pages.Report}`:
        return setCurrentPage(Pages.Report);
      default:
        return setCurrentPage(Pages.NotFound);
    }
  }, [location.pathname]);

  switch (currentPage) {
    case Pages.Root:
      return <Redirect to={`/${Pages.Dashboard}`} />;
    case Pages.Dashboard:
      return <Dashboard />;
    case Pages.Report:
      return <Report />;
    default:
      return <NotFound />;
  }
};
