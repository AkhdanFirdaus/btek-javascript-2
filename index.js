const cmd = require('readline').createInterface({
	input: process.stdin, 
	output: process.stdout,
})

const currency = new Intl.NumberFormat("id-ID", {
	currency: "IDR",
	style: "currency"
})

const calculate = (distance) => {
	if (distance <= 2) {
		return {
			fee: 8000,
			service: 8000 * 0.045,
		}
	} else {
		let total = 8000 + ((distance-2) * 5000)
		return {
			fee: total,
			service: total * 0.045
		}
	}
}

const menu = () => {
  return new Promise((resolve, reject) => {
		cmd.question('Jarak tempuh: ', jarak => {
			let { fee, service } = calculate(jarak)
			console.log('Total ongkos kirim = ' + currency.format(fee))
			console.log('Biaya Layanan = ' + currency.format(service))
			
			cmd.question('Ulang(y/n): ', answer => {
				if (answer.toLowerCase() == 'n') {
					reject(false)
				} else {
					resolve(true)
				}
			})
    })
  })
}

const app = async () => {
	let repeat = true

	while (repeat) {
		cmd.setPrompt('Hitung Biaya Ongkos')
    await menu().catch(err => {
			repeat = false
    })
	}

	cmd.close()
}

cmd.on('close', () => {
	console.log('Bye!')
	process.exit(0)
})

app()
