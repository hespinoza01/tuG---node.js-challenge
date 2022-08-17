import { createLogger } from 'winston'
import { devLoggerConfig } from '../config/index'

export default function buildDevLogger () {
  return createLogger(devLoggerConfig)
}
