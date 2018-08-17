import Promise from 'bluebird'
import _ from 'underscore'

const mockData = {
  user: {
    'u01': {
      name: 'Kate Sohng',
      projects: [
        {
          'id': 'p01',
          'startDate': 1533945205998,
          'endDate': 1533945205998,
          'name': 'some project',
          'description': 'some description',
          'goal': 36,
          'progress': 10,
          'sprintIds': ['s01, s02'],
        },
        {
          'id': 'p02',
          'startDate': 1533945215998,
          'endDate': 1533945205998,
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
      'startDate': 1533945205998,
      'endDate': 1533945205998,
      'name': 'some project',
      'description': 'some description',
      'goal': 36,
      'progress': 10,
      'sprints': [
        {
          'id': 's01',
          'startDate': 1533945205998,
          'endDate': 1533945205998,
          'name': 'some sprint',
          'description': 'some description',
          'goal': 12,
          'progress': 5,
        },
        {
          'id': 's02',
          'startDate': 1533945205998,
          'endDate': 1533945205998,
          'name': 'some sprint2',
          'description': 'some description',
          'goal': 12,
          'progress': 5,
        },
      ],
    },
    'p02': {
      'id': 'p02',
      'startDate': 1533945215998,
      'endDate': 1533945205998,
      'name': 'some project2',
      'description': 'some description2',
      'goal': 36,
      'progress': 10,
      'sprints':
        [
          {
            'id': 's03',
            'startDate': 1533945205998,
            'endDate': 1533945205998,
            'name': 'some sprint3',
            'description': 'some description',
            'goal': 12,
            'progress': 5,
          },
          {
            'id': 's04',
            'startDate': 1533945205998,
            'endDate': 1533945205998,
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
      'startDate': 1533945205998,
      'endDate': 1533945205998,
      'name': 'some sprint',
      'description': 'some description',
      'goal': 12,
      'progress': 5,
      'tasks': [
        {
          id: 't01',
          name: 'some task',
          lastModified: 1533945205998,
          durationOnTask: 323232,
        },
        {
          id: 't02',
          name: 'some task2',
          lastModified: 1533945205198,
          durationOnTask: 323232,
        },
      ],
    },
    's02': {
      'id': 's02',
      'startDate': 1533945205998,
      'endDate': 1533945205998,
      'name': 'some sprint2',
      'description': 'some description',
      'goal': 12,
      'progress': 5,
      'tasks': [
        {
          id: 't01',
          name: 'some task',
          lastModified: 1533945205998,
          durationOnTask: 323232,
        },
        {
          id: 't02',
          name: 'some task2',
          lastModified: 1533945205198,
          durationOnTask: 323232,
        },
      ],
    },
    's03': {
      'id': 's03',
      'startDate': 1533945205998,
      'endDate': 1533945205998,
      'name': 'some sprint3',
      'description': 'some description',
      'goal': 12,
      'progress': 5,
      'tasks': [
        {
          id: 't01',
          name: 'some task',
          lastModified: 1533945205998,
          durationOnTask: 323232,
        },
        {
          id: 't02',
          name: 'some task2',
          lastModified: 1533945205198,
          durationOnTask: 323232,
        },
      ],
    },
    's04': {
      'id': 's04',
      'startDate': 1533945205998,
      'endDate': 1533945205998,
      'name': 'some sprint4',
      'description': 'some description',
      'goal': 12,
      'progress': 5,
      'tasks': [
        {
          id: 't01',
          name: 'some task',
          lastModified: 1533945205998,
          durationOnTask: 323232,
        },
        {
          id: 't02',
          name: 'some task2',
          lastModified: 1533945205198,
          durationOnTask: 323232,
        },
      ],
    },
    tasks: {
      t01: {
        id: 't01',
        name: 'some task',
        lastModified: 1533945205998,
        timeRecords: [1533945105198, 1533945155298, 1533945165998, 1533945205998],
      },
      t02: {
        id: 't02',
        name: 'some task2',
        lastModified: 1533945205198,
        timeRecords: [1533945105198, 1533945155298, 1533945165998, 1533945205998]
      },
    }
  }
}

export class MockDataRepository {
  getUserAsync(uid) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.user[uid]);
      }, 1000);
    });
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

        resolve(projects)
      }, 1000)
    })
  }

  getProjectByIdAsync(projectId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.projects[projectId])
      }, 500)
    })
  }

  getSprintByIdAsync(sprintId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.sprints[sprintId])
      }, 500)
    })
  }

  getTaskByIdAsync(taskId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.tasks[taskId])
      }, 500)
    })
  }
}