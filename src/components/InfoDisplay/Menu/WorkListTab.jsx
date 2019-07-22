import React from "react";
import { Tab } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const WorkListTab = ({ currentFeature, setCurrentFeature, eventKey }) => {
  const { t } = useTranslation();

  return (
    <Tab.Pane eventKey={eventKey}>
      <strong>{t('general.work_list')}</strong>
    </Tab.Pane>
  );
}

export default WorkListTab;
