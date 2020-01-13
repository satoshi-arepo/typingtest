<?php $words = file("english200.txt");
for ($i = 0; $i < 255; $i++) {
	$index = rand(0,301);
	echo($words[$index]);
}
?>
