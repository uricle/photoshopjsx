#include "saveAsType.jsx"

var orgDoc = activeDocument
var orgResolution = activeDocument.resolution
var orgWidth = orgDoc.width
var orgHeight = orgDoc.height

main()

function main(){
	var folderObj = Folder.selectDialog("出力先を選択して下さい")
	if ( folderObj == null ) {
		return
	}
	cropAndSaveLayer(orgDoc.activeLayer, folderObj)
}

// 指定レイヤを別ファイルにして保存
function cropAndSaveLayer(layer, outFolder){
	var bounds = layer.bounds;
	var name = layer.name;
	var newDoc = documents.add(orgWidth, orgHeight, orgResolution, name, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
	activeDocument = orgDoc;
	layer.duplicate(newDoc);
	activeDocument = newDoc;
	newDoc.crop(bounds);
	saveAs(newDoc, outFolder+'/'+name, '.tga')
	newDoc.close(SaveOptions.DONOTSAVECHANGES)
	activeDocument = orgDoc
}
