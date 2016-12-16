const COLLECT_DATA = 'COLLECT_DATA'

export default function collectData(data) {
  console.log('actions', data);
  return {
    type: COLLECT_DATA,
    data
  }
}
