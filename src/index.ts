import * as config from './config.js'

function main() {
  config.setUser("Tyler")
  console.log(config.readConfig())
}

main()
