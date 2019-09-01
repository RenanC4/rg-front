import moment from 'moment'
import 'moment/locale/pt-br'

export const formatDate = date => {
 return moment(date).format('DD MMM YYYY')
}