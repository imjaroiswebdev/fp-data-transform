const R = require('ramda')
const tasks = require('./mock/tasks')

function log (obj) {
  const output = JSON.stringify(obj, null, 2)

  console.log('\n' + output)
}

/**
 * @function incomplete
 * @param  {array} - Array of objects with key "complete"
 * @return {array} New array filtered by taks not completed
 */
const incomplete = R.filter(R.whereEq({ complete: false }))

/**
 * @function sortByDate
 * @param  {array} - Array of objects with key "dueDate"
 * @return {array} New array ascending sorted by date
 */
const sortByDate = R.sortBy(R.prop('dueDate'))

/**
 * @function sortByDateDescend
 * @param  {array} - Array of objects with key "dueDate"
 * @return {array} New array descending sorted by date
 */
const sortByDateDescend = R.compose(R.reverse, sortByDate)

/**
 * @function infoFields
 * @param  {object} - Hash with keys "title" and "dueDate"
 * @return {object} Hash only with keys "title" and "dueDate"
 */
const infoFields = R.project(['title', 'dueDate'])

const groupByUser = R.groupBy(R.prop('username'))
const activeByUser = R.compose(groupByUser, incomplete)
const byUser = R.useWith(R.filter, [R.propEq('username')])

const resumeData = R.compose(
  infoFields,
  R.take(5),
  sortByDateDescend
)

function infoByUser (user) {
  return R.compose(
    resumeData,
    byUser(user)
  )
}

const infoAllUsers = R.compose(
  R.map(resumeData),
  activeByUser
)

console.log('\n===========================')
console.log('Active tasks resume by user...')
log(infoAllUsers(tasks))

console.log('\n===========================')
console.log('Active tasks resume of Richard...')
const infoForRichard = infoByUser('Richard')
log(infoForRichard(tasks))

module.export = {
  incomplete,
  sortByDate,
  sortByDateDescend,
  infoFields,
  groupByUser,
  activeByUser,
  byUser
}
