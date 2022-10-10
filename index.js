const readline = require('readline')

const cmd = readline.createInterface({
	input: process.stdin, 
	output: process.stdout,
})

const currency = new Intl.NumberFormat("id-ID", {
	currency: "IDR",
	style: "currency"
})

console.log('Hitung Biaya Ongkos')

const tanya = () => {
	cmd.question('Jarak tempuh: ', jarak => {
		hitung(jarak)
	
		cmd.question('Ulang(y/n): ', answer => {
			if (answer.toLowerCase() == 'n') {
				cmd.close()
			} else {
				tanya()
			}
		})
	})
}

tanya()

cmd.on('close', () => {
	console.log('Bye!')
	process.exit(0)
})

const hitung = (jarak) => {
	let ongkoskirim = 0
	let biayalayanan = 0

	if (jarak <= 2) {
		let harga = 8000
		ongkoskirim = harga
		biayalayanan = 0.045 * ongkoskirim
	} else {
		let harga = 5000
		ongkoskirim = 8000
		for (let i=2; i<jarak; i++) {
				ongkoskirim += harga
		}
		biayalayanan = 0.045 * ongkoskirim
	}

	console.log('Total ongkos kirim = ' + currency.format(ongkoskirim))
	console.log('Biaya Layanan = ' + currency.format(biayalayanan))
}
