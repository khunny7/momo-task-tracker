const getHoursMinutesSecondsFromValue = (timeValue) => {
  let timeDiff = timeValue;

  const hours = Math.floor(timeDiff / 100 / 60 / 60)

  timeDiff -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(timeDiff / 1000 / 60)

  timeDiff -= minutes * 1000 * 60

  const seconds = Math.floor(timeDiff / 1000);

  return {
    hours,
    minutes,
    seconds,
  }
}

const getDurationInString = (timeValue, type) => {
  const timeDurationValue = timeValue ? timeValue : 0

  const {
    hours,
    minutes,
    seconds,
  } = getHoursMinutesSecondsFromValue(timeDurationValue)

  if (type === 'progress') {
    return `${hours} hours ${minutes} minutes`
  } else {
    return `${('00' + hours).slice(-2)}:${('00' + minutes).slice(-2)}:${('00' + seconds).slice(-2)}`
  }
}

const getDurationInHours = (timeValue) => {
  return timeValue / 1000 / 60 / 60;
}

export {
  getHoursMinutesSecondsFromValue,
  getDurationInString,
  getDurationInHours,
}
