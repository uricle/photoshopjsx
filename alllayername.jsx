#target photoshop

createLayerNameText()
alert("出力終了")


function getLayerNameString(layObj, layerLevel)
{
	var space = ""
	for ( var l = 0; l < layerLevel; ++l ) {
		space = space + " "
	}
	return space + layObj.name
}

// targetArray に layObjを起点としたレイヤーオブジェクトを再帰的に登録する
function getAllLayerNames(targetArray, layObj, layerLevel)
{
    var layers = layObj.layers
    var len = layers.length
	for ( var i = 0; i < len; ++i) {
        var curlayer = layers[i]
		switch ( curlayer.typename ) {
			case "ArtLayer":
				targetArray[targetArray.length] = getLayerNameString( curlayer, layerLevel )
				break;
			case "LayerSet":
				targetArray[targetArray.length] = getLayerNameString( curlayer, layerLevel )
				getAllLayerNames(targetArray, curlayer, layerLevel+1 )
				break;
			default:
				//alert(layObj.layers[i].typename)
				break;
		}
	}
}

// 全レイヤー名を列挙したテキストを作る
function createLayerNameText()
{
    var layersets = activeDocument.layerSets
    // レイヤーをすべてあさる
    var layers = []
	var layerlevel = 0
    getAllLayerNames(layers, activeDocument, layerlevel)
	var fobj = File.saveDialog("保存ファイル名を入れて下さい")
	if ( fobj ) {
		fobj.open("w")
		fobj.encoding = "utf-8"
	    for ( var i = 0; i < layers.length; ++i ) {
			fobj.writeln(layers[i])
		}
		fobj.close()
	}
}
