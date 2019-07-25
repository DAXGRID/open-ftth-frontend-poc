import React from "react";
import { Tab } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const CircuitsTab = ({ currentFeature, eventKey }) => {
  const { t } = useTranslation();

  return (
    <Tab.Pane eventKey={eventKey}>
      <strong>{t('general.circuits')}</strong>
    </Tab.Pane>
  );
}

export default CircuitsTab;
