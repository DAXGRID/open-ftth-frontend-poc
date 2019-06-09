// import Constants from '@mapbox/mapbox-gl-draw/src/constants'
// import SimpleSelect from '@mapbox/mapbox-gl-draw/src/modes/simple_select'
// import { updateSelectedUneditableFeature } from '../redux/actions'
// import store from '../index';
//
// var InfoSimpleSelectMode = {...SimpleSelect}
//
// InfoSimpleSelectMode.clickOnFeature = function(state, e) {
//   const featureId = e.featureTarget.properties.id
//   const selectedFeatureIds = this.getSelectedIds()
//   console.log(store)
//
//   console.log('clicked feature')
//   console.log(featureId)
//
//   if (this.canEditFeature(featureId)) {
//     console.log('canEditFeature')
//     SimpleSelect.clickOnFeature.call(this, state, e)
//   } else {
//     console.log('cant EditFeature')
//     // store.dispatch(updateSelectedUneditableFeature(featureId))
//     feature.properties.selectedUneditable = "true"
//
//     const feature = this.getFeature(featureId)
//     this.doRender(featureId)
//
//     // this.setSelected(featureId)
//     // No matter what, re-render the clicked feature
//     console.log(feature.properties)
//   }
// }
//
// InfoSimpleSelectMode.canEditFeature = function(featureId) {
//   const feature = this.getFeature(featureId)
//   console.log(feature)
//
//   const draw = this.map._controls.filter((control) => control.hasOwnProperty('getAll'))[0]
//   const editableFeatureTypes = draw.options.editableFeatureTypes
//   console.log('editableFeatureTypes')
//   console.log(editableFeatureTypes)
//   const physicalType = feature.properties.physicalType
//
//   if (!physicalType || !editableFeatureTypes) return
//   return editableFeatureTypes.includes(physicalType)
// }
//
// export default InfoSimpleSelectMode
