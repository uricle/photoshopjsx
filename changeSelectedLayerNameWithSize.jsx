#target photoshop

#include "getSelectedLayers.jsx"

main()

// 指定したレイヤーのサイズに応じてレイヤー名に (幅x高さ) をつけた名前を返す
function createSizeName(layObj) {
	var left = layObj.bounds[0];
	var top  = layObj.bounds[1];
	var right = layObj.bounds[2];
	var bottom = layObj.bounds[3];
	var width = Number(right-left);
	var height = Number(bottom-top);
	var newname = String(layObj.name);
	//alert(newname)
	newname = newname.replace(/\([0-9]+x[0-9]+\)$/, '');
	//alert(newname)
	return newname + "(" + width+"x" + height + ")";
}

// 指定したレイヤーの名称をレイヤー名生成関数で作成した名称にかえる
function changeLayerNameWithSize(layObj)
{
	// レイヤー名を変更するとvisibleがtrueになるようなので保存しておく
    var oldvisible = layObj.visible
    layObj.name = createSizeName(layObj)
    layObj.visible = oldvisible
}

// 選択レイヤーすべてを対象に名称変更関数を呼び出す
function main()
{
	var layers = executeSelectedLayers(app.activeDocument, changeLayerNameWithSize)
	var editCount = layers.length
	if ( editCount == 0 ) {
		return
	}
	alert(editCount + "個のレイヤー名を変更しました")
}
