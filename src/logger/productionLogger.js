import { createLogger } from 'winston'
import { prodLoggerConfig } from '../config/index'

export default function buildProductLogger () {
  return createLogger(prodLoggerConfig)
}
