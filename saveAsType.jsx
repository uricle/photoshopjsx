#target photoshop
// 各種セーブのひな形
// saveAs(savefileObj, saveOpt, createDuplicate, extensionOpt )

// 拡張子に応じてセーブ
// targetDocument : 保存対象のドキュメント
// filename : 出力ファイル名
// defaultExt : 出力ファイル名で拡張子が省略された場合の拡張子
// saveOpt : セーブオプション(指定する場合は、拡張子にあわせたものにすること)
function saveAs( targetDocument, filename, defaultExt, saveOpt )
{
	var ext = filename.match(/\.[^.]+$/)
	if ( ext === null ) {
		filename = filename + defaultExt
		ext = filename.match(/\.[^.]+$/)
	}
	var lext = ext[0].toLowerCase()
	switch ( lext ) {
	case '.tga':
		saveTga( targetDocument, filename, saveOpt)
		break;
	case '.png':
		savePng( targetDocument, filename, saveOpt)
		break;
	default:
		alert("not supprted extension :" + lext + " " + filename)
		break;
	}

}
// PNGでセーブ
// targetDocument : 保存対象のドキュメント
// filename : 出力ファイル名
// saveOpt : pngセーブオプション(省略可能)
function savePng( targetDocument, filename, saveOpt )
{
	if ( saveOpt == null ) {
		saveOpt = new PNGSaveOptions
		saveOpt.interlacted = false
	}
	var saveObj = new File(filename)
	targetDocument.saveAs( saveObj, saveOpt, true, Extension.LOWERCASE )
}

// Tgaでセーブ
// targetDocument : 保存対象のドキュメント
// filename : 出力ファイル名
// saveOpt : tgaセーブオプション(省略可能)
function saveTga( targetDocument, filename, saveOpt )
{
	if ( saveOpt == null ) {
		saveOpt = new TargaSaveOptions
		//saveOpt.resolution = TargaBitsPerPixels.SIXTEEN
		//saveOpt.resolution = TargaBitsPerPixels.TWENTYFOUR
		saveOpt.resolution = TargaBitsPerPixels.THIRTYTWO
		saveOpt.rleCompression = false
		saveOpt.alphaChannels = true
	}
	var saveObj = new File(filename)
	var oldDoc = activeDocument
	activeDocument = targetDocument
	mergeAllLayers()
	makeAlphaFromTransparency()
	targetDocument.saveAs( saveObj, saveOpt, true, Extension.LOWERCASE )
	activeDocument = oldDoc
}
// レイヤーを統合する
function mergeAllLayers()
{
	var idMrgtwo = charIDToTypeID( "Mrg2" );
	executeAction( idMrgtwo, undefined, DialogModes.NO );
}

// アルファを透過から作る
function makeAlphaFromTransparency()
{
    // =======================================================
    var id7 = charIDToTypeID( "setd" );
    var desc3 = new ActionDescriptor();
    var id8 = charIDToTypeID( "null" );
    var ref1 = new ActionReference();
    var id9 = charIDToTypeID( "Chnl" );
    var id10 = charIDToTypeID( "fsel" );
    ref1.putProperty( id9, id10 );
    desc3.putReference( id8, ref1 );
    var id11 = charIDToTypeID( "T   " );
    var ref2 = new ActionReference();
    var id12 = charIDToTypeID( "Chnl" );
    var id13 = charIDToTypeID( "Chnl" );
    var id14 = charIDToTypeID( "Trsp" );
    ref2.putEnumerated( id12, id13, id14 );
    desc3.putReference( id11, ref2 );
    executeAction( id7, desc3, DialogModes.NO );

    // =======================================================
    var id15 = charIDToTypeID( "Dplc" );
    var desc4 = new ActionDescriptor();
    var id16 = charIDToTypeID( "null" );
    var ref3 = new ActionReference();
    var id17 = charIDToTypeID( "Chnl" );
    var id18 = charIDToTypeID( "fsel" );
    ref3.putProperty( id17, id18 );
    desc4.putReference( id16, ref3 );
    var id19 = charIDToTypeID( "Nm  " );
    desc4.putString( id19, "alpha" );
    executeAction( id15, desc4, DialogModes.NO );
}
