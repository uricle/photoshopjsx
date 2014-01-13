#target photoshop
/* activeDocument.*/

//http://forums.adobe.com/message/2666611
//http://morris-photographics.com/photoshop/scripts/downloads/Distribute%20Layer%20Spacing%20Horizontal%200-2-0.jsx
function cTID(s) {return app.charIDToTypeID(s);}
function sTID(s) {return app.stringIDToTypeID(s);}
///////////////////////////////////////////////////////////////////////////////
// getSelectedLayersIndex - get the index of all selected layers
// credit: Mike Hale
///////////////////////////////////////////////////////////////////////////////
function getSelectedLayersIndex(doc) {
    var selectedLayers = [];
    var ref = new ActionReference();
    ref.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Trgt'));
    var desc = executeActionGet(ref);
    if (desc.hasKey(sTID('targetLayers'))) {
        desc = desc.getList(sTID('targetLayers'));
        var c = desc.count; 
        for (var i = 0; i < c; i++) {
            try {
                doc.backgroundLayer;
                selectedLayers.push(desc.getReference(i).getIndex());
            }
            catch(e) {
                selectedLayers.push(desc.getReference(i).getIndex() + 1);
            }
        }
    }
    else {
        var ref = new ActionReference();
        ref.putProperty(cTID('Prpr'), cTID('ItmI'));
        ref.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        try {
            doc.backgroundLayer;
            selectedLayers.push(executeActionGet(ref).getInteger(cTID('ItmI')) - 1);
        }
        catch(e) {
            selectedLayers.push(executeActionGet(ref).getInteger(cTID('ItmI')));
        }
    }
    return selectedLayers;
}
function makeActiveByIndex( idx ){
     try{
          var desc = new ActionDescriptor();
          var ref = new ActionReference();
          ref.putIndex(charIDToTypeID( "Lyr " ), idx)
          desc.putReference( charIDToTypeID( "null" ), ref );
//          desc.putBoolean( charIDToTypeID( "MkVs" ), forceVisible );
          executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO );
     }catch(e){ return -1;}
}

function getSelectedLayers(doc)
{
  var layers = getSelectedLayersIndex(doc)
  if ( layers.length == 0 ) {
    return layers
  }
  var selectedLayers = []
  for ( var i = 0; i < layers.length; ++i) {
      makeActiveByIndex(layers[i])
      selectedLayers.push(activeDocument.activeLayer)
  }
  return selectedLayers
}
function executeSelectedLayers(doc, closure)
{
  var layers = getSelectedLayersIndex(doc)
  if ( layers.length == 0 ) {
    return layers
  }
  var selectedLayers = []
  for ( var i = 0; i < layers.length; ++i) {
      makeActiveByIndex(layers[i])
      closure(activeDocument.activeLayer)
  }
  return layers
}
