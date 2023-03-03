const targetDate = new Date("2067-08-24T03:24:00")

setInterval(() => {
  const now = new Date().getTime()
  const timeDifference = targetDate - now

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

  console.log(`≈ ${days}d ${hours}h ${minutes}m ${seconds}s`)
}, 1000)
