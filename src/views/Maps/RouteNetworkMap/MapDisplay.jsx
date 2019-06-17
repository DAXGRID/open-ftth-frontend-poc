import React from "react";
import { connect } from "react-redux";
import {
  createFeatures,
  updateFeatures,
  deleteFeatures
} from "../../../redux/actions";
import { editableFeature } from "../../../lib/draw/permissions";
import EditableMapboxDisplay from "../EditableMapboxDisplay";

const container = "mapbox-map";

function MapDisplay(props) {
  const editableFeatures = props.features.filter(feature => {
    return editableFeature(feature, props.currentUser.permissions);
  });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <EditableMapboxDisplay
        viewport={props.viewport}
        editableFeatures={editableFeatures}
        uneditableFeatures={props.uneditableFeatures}
        permissions={props.currentUser.permissions}
        createFeatures={props.createFeatures}
        updateFeatures={props.updateFeatures}
        deleteFeatures={props.deleteFeatures}
        container={container}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.users[state.currentUserID],
    features: state.features,
    viewport: {
      latitude: "55.746384700121446",
      longitude: "9.6377473217318386",
      zoom: 15,
      styleID: "mapbox/streets-v9"
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createFeatures: features => dispatch(createFeatures(features)),
    updateFeatures: features => dispatch(updateFeatures(features)),
    deleteFeatures: features => dispatch(deleteFeatures(features))
  };
};

MapDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapDisplay);

export default MapDisplay;
