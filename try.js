$( function() {

	$('#upload').on('click', function(){
		var fileInput = document.getElementById('fileInput').files[0];
		var reader = new FileReader();
		reader.onload = function() {
			var uploadData = reader.result;

			var pos1 = uploadData.indexOf(':');
			var pos2 = uploadData.indexOf(';');
			var pos3 = uploadData.indexOf(',');

			var FileName = fileInput.name;
			var MIMEType = uploadData.substr(pos1+1,pos2-pos1-1);
			var FileData = uploadData.substr(pos3+1);

			console.log(FileName);
			console.log(MIMEType);
			console.log(FileData);

			$.post('save_file.php', 
				{FileName: FileName, MIMEType: MIMEType, FileData: FileData}, 
				function(data) {
					if(data=='1') console.log('Successfully saved on the server.');
					else console.log('Error: ' + data);
				}
			);
		}
		reader.readAsDataURL(fileInput);
	});

	$('#download').on('click', function() {
		$.post('get_file.php', {}, function(data) {
			if(data=='0') console.log('Error: ' + data);
			else {
				if(bowser.safari) {
					// anything but IE
					var a = document.createElement('a');
					a.setAttribute('download', 'test.pdf');
					a.href = 'data:application/pdf;base64,'+data;
					a.innerHTML = 'testing';
					a.style.display = 'none';
					document.body.appendChild(a);
					a.click();
				}
				else {
					// anything but Safari
					var byteArray = base64_to_byte_array(data);
					var blob = new Blob([byteArray], {type: 'application/pdf'});
					var sss = saveAs(blob, 'test.pdf'); 
				}
			}
		});
	});
});

function base64_to_byte_array(data) {
	data = atob(data);
	var dataLength = data.length;
	var byteNumbers = new Array(dataLength);
	for(var i = 0; i < dataLength; i++) {
		byteNumbers[i] = data.charCodeAt(i);
	}
	var byteArray = new Uint8Array(byteNumbers);
	return byteArray;
}