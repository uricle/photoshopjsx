#target photoshop

// targetArray に layObjを起点としたレイヤーオブジェクトを再帰的に登録する
function getAllLayers(targetArray, layObj)
{
    var layers = layObj.layers
    var len = layers.length
	for ( var i = 0; i < len; ++i) {
        var curlayer = layers[i]
		switch ( curlayer.typename ) {
			case "ArtLayer":
				targetArray[targetArray.length] = curlayer
				break;
			case "LayerSet":
				getAllLayers(targetArray, curlayer)
				break;
			default:
				//alert(layObj.layers[i].typename)
				break;
		}
	}
}

// 全レイヤー名を列挙したダイアログを表示して
// 選択されたレイヤーに対して closure を実行する
function showAllLayerExecuteDialog(closure)
{
    var dialog = new Window('dialog','All Layer Select', [100,100,480,400])
    var artlayers = activeDocument.artLayers
    var layersets = activeDocument.layerSets
    // レイヤーをすべてあさる
    var layers = []
    getAllLayers(layers, activeDocument)
    // 上記のレイヤー配列に対応した名称を配列によけておく
    var layernames = Array( layers.length )
    for ( var i = 0; i < layers.length; ++i ) {
    	layernames[i] = layers[i].name;
    }
    //alert("creat dialog")
    dialog.orienation = 'row'
    dialog.alignChildren = 'left'
    dialog.listBox = dialog.add("listbox",[10,30,370,230],layernames, { multiselect:true})
    dialog.okBtn = dialog.add("button",[30,250,100,275], "OK", { name:"ok"})
    dialog.cancelBtn = dialog.add("button",[110,250,170,275], "Cancel", { name:"cancel"})
    dialog.clearBtn = dialog.add("button", [180,250,230,275], "Clear")
    dialog.allBtn = dialog.add("button", [240,250,290,275], "All")
    dialog.clearBtn.onClick = function() {
        for( var i = 0; i < this.parent.listBox.items.length; ++i )
        {
    	   this.parent.listBox.items[ i ].selected = false;
        }
    }
    dialog.allBtn.onClick = function() {
        for( var i = 0; i < this.parent.listBox.items.length; ++i )
        {
        	this.parent.listBox.items[ i ].selected = true;
        }
    }
    dialog.center()
    var result = dialog.show();

    if ( result != 1 ) {
        return 0
    }
    if ( dialog.listBox.selection == null ) {
        alert ('項目を選んでください')
        return 0
    }
    var executeCount = dialog.listBox.selection.length
    for( var i = 0; i < executeCount; ++i )
    {
    	var index = dialog.listBox.selection[i].index
        closure(layers[index])
    }
    return executeCount
}
