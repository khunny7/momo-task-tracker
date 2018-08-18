import Promise from 'bluebird'
import _ from 'underscore'

const mockData = {
  user: {
    'u01': {
      name: 'Kate Sohng',
      projects: [
        {
          'id': 'p01',
          'start': 1533945205998,
          'end': 1533945205998,
          'name': 'some project',
          'description': 'some description',
          'goal': 36,
          'progress': 10,
          'sprintIds': ['s01, s02'],
        },
        {
          'id': 'p02',
          'start': 1533945215998,
          'end': 1533945205998,
          'name': 'some project2',
          'description': 'some description2',
          'goal': 36,
          'progress': 10,
          'sprintIds': ['s03, s04'],
        },
      ],
    },
  },
  projects: {
    'p01': {
      'id': 'p01',
      'start': 1533945205998,
      'end': 1533945205998,
      'name': 'some project',
      'description': 'some description',
      'goal': 36,
      'progress': 10,
      'sprints': [
        {
          'id': 's01',
          'start': 1533945205998,
          'end': 1533945205998,
          'name': 'some sprint',
          'description': 'some description',
          'goal': 12,
          'progress': 5,
        },
        {
          'id': 's02',
          'start': 1533945205998,
          'end': 1533945205998,
          'name': 'some sprint2',
          'description': 'some description',
          'goal': 12,
          'progress': 5,
        },
      ],
    },
    'p02': {
      'id': 'p02',
      'start': 1533945215998,
      'end': 1533945205998,
      'name': 'some project2',
      'description': 'some description2',
      'goal': 36,
      'progress': 10,
      'sprints':
        [
          {
            'id': 's03',
            'start': 1533945205998,
            'end': 1533945205998,
            'name': 'some sprint3',
            'description': 'some description',
            'goal': 12,
            'progress': 5,
          },
          {
            'id': 's04',
            'start': 1533945205998,
            'end': 1533945205998,
            'name': 'some sprint4',
            'description': 'some description',
            'goal': 12,
            'progress': 5,
          }
        ],
    },
  },
  sprints: {
    's01': {
      'id': 's01',
      'start': 1533945205998,
      'end': 1533945205998,
      'name': 'some sprint',
      'description': 'some description',
      'goal': 12,
      'progress': 5,
      'tasks': [
        {
          id: 't01',
          name: 'some task',
          timeStamp: 1533945205998,
          durationOnTask: 323232,
        },
        {
          id: 't02',
          name: 'some task2',
          timeStamp: 1533945205198,
          durationOnTask: 323232,
        },
      ],
    },
    's02': {
      'id': 's02',
      'start': 1533945205998,
      'end': 1533945205998,
      'name': 'some sprint2',
      'description': 'some description',
      'goal': 12,
      'progress': 5,
      'tasks': [
        {
          id: 't01',
          name: 'some task',
          timeStamp: 1533945205998,
          durationOnTask: 323232,
        },
        {
          id: 't02',
          name: 'some task2',
          timeStamp: 1533945205198,
          durationOnTask: 323232,
        },
      ],
    },
    's03': {
      'id': 's03',
      'start': 1533945205998,
      'end': 1533945205998,
      'name': 'some sprint3',
      'description': 'some description',
      'goal': 12,
      'progress': 5,
      'tasks': [
        {
          id: 't01',
          name: 'some task',
          timeStamp: 1533945205998,
          durationOnTask: 323232,
        },
        {
          id: 't02',
          name: 'some task2',
          timeStamp: 1533945205198,
          durationOnTask: 323232,
        },
      ],
    },
    's04': {
      'id': 's04',
      'start': 1533945205998,
      'end': 1533945205998,
      'name': 'some sprint4',
      'description': 'some description',
      'goal': 12,
      'progress': 5,
      'tasks': [
        {
          id: 't01',
          name: 'some task',
          timeStamp: 1533945205998,
          durationOnTask: 323232,
        },
        {
          id: 't02',
          name: 'some task2',
          timeStamp: 1533945205198,
          durationOnTask: 323232,
        },
      ],
    },
  },
  tasks: {
    t01: {
      id: 't01',
      name: 'some task',
      timeStamp: 1533945205998,
      start: 1533945105198,
      end: 1533945155298,
    },
    t02: {
      id: 't02',
      name: 'some task2',
      timeStamp: 1533945205198,
      start: 1533945105198,
      end: 1533945155298,
    },
  },
}

const simpleClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export class MockDataRepository {
  getUserAsync(uid) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(simpleClone(mockData.user[uid]));
      }, 1000);
    });
  }

  createProjectAsync(project, uid) {
    project.id = (new Date()).valueOf()
    project.timeStamp = (new Date()).valueOf()
    project.sprints = []

    return new Promise((resolve) => {
      setTimeout(() => {
        mockData.projects[project.id] = project

        const projectInList = simpleClone(_.pick(project, 'id', 'name', 'description', 'start', 'end'))

        projectInList.sprintIds = []

        mockData.user[uid].projects.push(
          projectInList
        )

        resolve()
      }, 500)
    })
  }

  createSprintAsync(sprint, pid) {
    sprint.id = (new Date()).valueOf()
    sprint.timeStamp = (new Date()).valueOf()
    sprint.tasks = []

    return new Promise((resolve) => {
      setTimeout(() => {
        mockData.sprints[sprint.id] = sprint

        const sprintPreviewItem = simpleClone(_.pick(sprint, 'id', 'name', 'description', 'start', 'end', 'goal', 'progress'))

        mockData.projects[pid].sprints.push(
          sprintPreviewItem
        )

        resolve()
      }, 500)
    })
  }

  getProjectsAsync(projectIds) {
    return new Promise((resolve) => {
      const projects = [];
      setTimeout(() => {
        _.each(mockData.projects, (project, key) => {
          if (_.contains(projectIds, key)) {
            projects.push(project)
          }
        })

        resolve(simpleClone(projects))
      }, 1000)
    })
  }

  getProjectByIdAsync(projectId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(simpleClone(mockData.projects[projectId]))
      }, 500)
    })
  }

  getSprintByIdAsync(sprintId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(simpleClone(mockData.sprints[sprintId]))
      }, 500)
    })
  }

  getTaskByIdAsync(taskId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(simpleClone(mockData.tasks[taskId]))
      }, 500)
    })
  }

  saveTask(task) {
    task.id = (new Date()).valueOf();

    return new Promise((resolve) => {
      setTimeout(() => {
        mockData.tasks[task.id] = task

        resolve(simpleClone(task))
      }, 500)
    })
  }

  addTaskToSprint(task, sprintId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockData.sprints[sprintId].tasks.push(task)

        resolve()
      }, 500)
    })
  }
}