import React from "react";
import { Tab } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const ConduitsTab = ({ currentFeature, eventKey }) => {
  const { t } = useTranslation();
  
  return (
    <Tab.Pane eventKey={eventKey}>
      <strong>{t('general.conduits')}</strong>

    </Tab.Pane>
  );
}

export default ConduitsTab;
