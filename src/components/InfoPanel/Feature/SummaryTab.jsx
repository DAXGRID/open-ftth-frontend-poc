import React from "react";
import { Tab } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const SummaryTab = ({ currentFeature, eventKey }) => {
  const { t } = useTranslation();

  return (
    <Tab.Pane eventKey={eventKey}>
      <strong>{t('general.summary')}</strong>
    </Tab.Pane>
  );
}

export default SummaryTab;
