const COLLECT_DATA = 'COLLECT_DATA'

export default function collectData(data) {
  return {
    type: COLLECT_DATA,
    data
  }
}
