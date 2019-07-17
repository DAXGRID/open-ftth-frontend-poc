import React from "react";
import { Tab } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const RouteNetworkTab = ({ currentFeature, eventKey }) => {
  const { t } = useTranslation();

  return (
    <Tab.Pane eventKey={eventKey}>
      <strong>{t('general.route_network')}</strong>
    </Tab.Pane>
  );
}

export default RouteNetworkTab;
