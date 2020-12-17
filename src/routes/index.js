import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';
import MonthlyPatinet from '../pages/Statistics/MonthlyPatinet';
import MonthlyMedicines from '../pages/Statistics/MonthlyMedicines';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));
// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const EmailInbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
const EmailCompose = React.lazy(() => import('../pages/apps/Email/Compose'));
const ProjectList = React.lazy(() => import('../pages/apps/Project/List'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Project/Detail/'));
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List'));
const TaskBoard = React.lazy(() => import('../pages/apps/Tasks/Board'));

// pages
const Starter = React.lazy(() => import('../pages/other/Starter'));
const Profile = React.lazy(() => import('../pages/other/Profile/'));
const Activity = React.lazy(() => import('../pages/other/Activity'));
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Error404 = React.lazy(() => import('../pages/other/Error404'));
const Error500 = React.lazy(() => import('../pages/other/Error500'));

// ui
const BSComponents = React.lazy(() => import('../pages/uikit/BSComponents/'));
const FeatherIcons = React.lazy(() => import('../pages/uikit/Icons/Feather'));
const UniconsIcons = React.lazy(() => import('../pages/uikit/Icons/Unicons'));
const Widgets = React.lazy(() => import('../pages/uikit/Widgets/'));

// charts
const Charts = React.lazy(() => import('../pages/charts/'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editor = React.lazy(() => import('../pages/forms/Editor'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

//patients
const PatientList = React.lazy(() => import('../pages/Patients/PatientList'));
const NewPatient = React.lazy(() => import('../pages/Patients/NewPatient'));
const PatientDetail = React.lazy(() => import('../pages/Patients/PatientDetail'));
//employees
const EmployeesList = React.lazy(() => import('../pages/Employees/EmployeeLists'));
// const NewEmployees = React.lazy(() => import('../pages/Employees/NewPatient'));
// const EmployeesDetail = React.lazy(() => import('../pages/Employees/PatientDetail'));

//appointment && Examination
const AppointmentList = React.lazy(() => import('../pages/Examination/AppointmentList'));
const ExaminationList = React.lazy(() => import('../pages/Examination/ExaminationList'));
const NewExamination = React.lazy(() => import('../pages/Examination/NewExamination'));
const ExaminationDetail = React.lazy(() => import('../pages/Examination/ExaminationDetail'));

//Invoices

const InvoiceDetail = React.lazy(() => import('../pages/Invoices/InvoiceDetail'));
const InvoiceList = React.lazy(() => import('../pages/Invoices/InvoiceList'));

//Statistic
const MonthlyRevenue = React.lazy(() => import('../pages/Statistics/MonthlyRevenue'));

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isUserAuthenticated()) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{
              pathname: '/account/login',
              state: { from: props.location },
            }}
          />
        );
      }

      const loggedInUser = getLoggedInUser();
      // check if route is restricted by role
      if (roles && roles.indexOf(loggedInUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: '/' }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

// root routes
const rootRoute = {
  path: '/',
  exact: true,
  component: () => <Redirect to="/dashboard" />,
  route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
  path: '/dashboard',
  name: 'Dashboard',
  icon: FeatherIcon.Home,
  header: 'Navigation',
  badge: {
    variant: 'success',
    text: '1',
  },
  component: Dashboard,
  roles: ['Admin', 'Employee'],
  route: PrivateRoute,
};

// apps

const patientRoutes = {
  path: '/app/patients',
  name: 'Bệnh nhân',
  header: 'Ứng dụng',
  icon: FeatherIcon.Grid,
  roles: ['Admin', 'Employee'],
  children: [
    {
      path: '/app/patients',
      name: 'Danh sách bệnh nhân',
      component: PatientList,
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/patients/new',
      name: 'Thêm bệnh nhân',
      component: NewPatient,
      route: PrivateRoute,
    },
    {
      path: '/app/patients/:id',
      component: PatientDetail,
      route: PrivateRoute,
    },
  ],
};
// const employeesRoutes = {
//   path: '/app/employees',
//   name: 'Nhân viên',
//   header: 'Quản lý Nhân Viên',
//   icon: FeatherIcon.Monitor,
//   roles: ['Admin', 'Employee'],
//   children: [
//     {
//       path: '/app/employees',
//       name: 'Danh sách nhân viên',
//       component: EmployeesList,
//       exact: true,
//       route: PrivateRoute,
//     },
//     {
//       path: '/app/employees/new',
//       name: 'Thêm nhân viên',
//       component: NewEmployees,
//       route: PrivateRoute,
//     },
//     {
//       path: '/app/employees/:id',
//       component: EmployeesDetail,
//       route: PrivateRoute,
//     },
//   ],
// };

const examinationRoutes = {
  path: '/app/appointments',
  name: 'Khám bệnh',
  icon: FeatherIcon.Grid,
  roles: ['Admin', 'Employee', 'Doctor'],
  children: [
    {
      path: '/app/appointments',
      name: 'Đăng ký khám bệnh',
      component: AppointmentList,
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/examinations',
      component: ExaminationList,
      name: 'Phiếu khám bệnh',
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/examinations/:examinationId',
      component: ExaminationDetail,
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/examinations/add/:appointId',
      component: NewExamination,
      exact: true,
      route: PrivateRoute,
    },
  ],
};

const invoiceRoutes = {
  path: '/app/invoices',
  name: 'Hóa đơn',
  icon: FeatherIcon.Grid,
  component: InvoiceList,
  exact: true,
  route: PrivateRoute,
  roles: ['Admin', 'Employee'],
};

const invoiceDetailRoutes = {
  path: '/app/invoices/:invoiceId',
  component: InvoiceDetail,
  route: PrivateRoute,
  roles: ['Admin', 'Employee'],
};

const statisticRoutes = {
  path: '/app/statistic',
  name: 'Thống kê',
  icon: FeatherIcon.Grid,
  roles: ['Admin'],
  children: [
    {
      path: '/app/statistic/revenue',
      name: 'Thống kê doanh thu',
      component: MonthlyRevenue,
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/statistic/patients',
      name: 'Thống kê bệnh nhân',
      component: MonthlyPatinet,
      exact: true,
      route: PrivateRoute,
    },
    {
      path: '/app/statistic/medicines',
      name: 'Thống kê thuốc',
      component: MonthlyMedicines,
      exact: true,
      route: PrivateRoute,
    },
  ],
};

const calendarAppRoutes = {
  path: '/apps/calendar',
  name: 'Calendar',
  icon: FeatherIcon.Calendar,
  component: CalendarApp,
  route: PrivateRoute,
  roles: ['Admin'],
};

const emailAppRoutes = {
  path: '/apps/email',
  name: 'Email',
  roles: ['Admin'],
  icon: FeatherIcon.Inbox,
  children: [
    {
      path: '/apps/email/inbox',
      name: 'Inbox',
      component: EmailInbox,
      route: PrivateRoute,
      roles: ['Admin'],
    },
    {
      path: '/apps/email/details',
      name: 'Details',
      component: EmailDetail,
      route: PrivateRoute,
      roles: ['Admin'],
    },
    {
      path: '/apps/email/compose',
      name: 'Compose',
      component: EmailCompose,
      route: PrivateRoute,
      roles: ['Admin'],
    },
  ],
};

const projectAppRoutes = {
  path: '/apps/projects',
  name: 'Projects',
  icon: FeatherIcon.Briefcase,
  roles: ['Admin'],
  children: [
    {
      path: '/apps/projects/list',
      name: 'List',
      component: ProjectList,
      route: PrivateRoute,
      roles: ['Admin'],
    },
    {
      path: '/apps/projects/detail',
      name: 'Detail',
      component: ProjectDetail,
      route: PrivateRoute,
      roles: ['Admin'],
    },
  ],
};

const taskAppRoutes = {
  path: '/apps/tasks',
  name: 'Tasks',
  icon: FeatherIcon.Bookmark,
  roles: ['Admin'],
  children: [
    {
      path: '/apps/tasks/list',
      name: 'List',
      component: TaskList,
      route: PrivateRoute,
      roles: ['Admin'],
    },
    {
      path: '/apps/tasks/board',
      name: 'Board',
      component: TaskBoard,
      route: PrivateRoute,
      roles: ['Admin'],
    },
  ],
};

const appRoutes = [
  patientRoutes,
  examinationRoutes,
  invoiceRoutes,
  invoiceDetailRoutes,
  statisticRoutes,
  calendarAppRoutes,
  emailAppRoutes,
  projectAppRoutes,
  taskAppRoutes,
];

// pages
const pagesRoutes = {
  path: '/pages',
  name: 'Pages',
  header: 'Custom',
  roles: ['Admin'],
  icon: FeatherIcon.FileText,
  children: [
    {
      path: '/pages/starter',
      name: 'Starter',
      component: Starter,
      route: PrivateRoute,
      roles: ['Admin'],
    },
    {
      path: '/pages/profile',
      name: 'Profile',
      component: Profile,
      route: PrivateRoute,
      roles: ['Admin'],
    },
    {
      path: '/pages/activity',
      name: 'Activity',
      component: Activity,
      route: PrivateRoute,
      roles: ['Admin'],
    },
    {
      path: '/pages/invoice',
      name: 'Invoice',
      component: Invoice,
      route: PrivateRoute,
      roles: ['Admin'],
    },
    {
      path: '/pages/pricing',
      name: 'Pricing',
      component: Pricing,
      route: PrivateRoute,
      roles: ['Admin'],
    },
    {
      path: '/pages/error-404',
      name: 'Error 404',
      component: Error404,
      route: Route,
    },
    {
      path: '/pages/error-500',
      name: 'Error 500',
      component: Error500,
      route: Route,
    },
  ],
};

// components
const componentsRoutes = {
  path: '/ui',
  name: 'UI Elements',
  header: 'Components',
  icon: FeatherIcon.Package,
  roles: ['Admin'],
  children: [
    {
      path: '/ui/bscomponents',
      name: 'Bootstrap UI',
      component: BSComponents,
      route: PrivateRoute,
      roles: ['Admin'],
    },
    {
      path: '/ui/icons',
      name: 'Icons',
      children: [
        {
          path: '/ui/icons/feather',
          name: 'Feather Icons',
          component: FeatherIcons,
          route: PrivateRoute,
          roles: ['Admin'],
        },
        {
          path: '/ui/icons/unicons',
          name: 'Unicons Icons',
          component: UniconsIcons,
          route: PrivateRoute,
          roles: ['Admin'],
        },
      ],
    },
    {
      path: '/ui/widgets',
      name: 'Widgets',
      component: Widgets,
      route: PrivateRoute,
      roles: ['Admin'],
    },
  ],
};

// charts
const chartRoutes = {
  path: '/charts',
  name: 'Charts',
  component: Charts,
  icon: FeatherIcon.PieChart,
  roles: ['Admin'],
  route: PrivateRoute,
};

// forms
const formsRoutes = {
  path: '/forms',
  name: 'Forms',
  icon: FeatherIcon.FileText,
  children: [
    {
      path: '/forms/basic',
      name: 'Basic Elements',
      component: BasicForms,
      route: PrivateRoute,
    },
    {
      path: '/forms/advanced',
      name: 'Advanced',
      component: FormAdvanced,
      route: PrivateRoute,
    },
    {
      path: '/forms/validation',
      name: 'Validation',
      component: FormValidation,
      route: PrivateRoute,
    },
    {
      path: '/forms/wizard',
      name: 'Wizard',
      component: FormWizard,
      route: PrivateRoute,
    },
    {
      path: '/forms/editor',
      name: 'Editor',
      component: Editor,
      route: PrivateRoute,
    },
    {
      path: '/forms/upload',
      name: 'File Upload',
      component: FileUpload,
      route: PrivateRoute,
    },
  ],
};

const tableRoutes = {
  path: '/tables',
  name: 'Tables',
  icon: FeatherIcon.Grid,
  children: [
    {
      path: '/tables/basic',
      name: 'Basic',
      component: BasicTables,
      route: PrivateRoute,
    },
    {
      path: '/tables/advanced',
      name: 'Advanced',
      component: AdvancedTables,
      route: PrivateRoute,
    },
  ],
};

// auth
const authRoutes = {
  path: '/account',
  name: 'Auth',
  children: [
    {
      path: '/account/login',
      name: 'Login',
      component: Login,
      route: Route,
    },
    {
      path: '/account/logout',
      name: 'Logout',
      component: Logout,
      route: Route,
    },
    {
      path: '/account/register',
      name: 'Register',
      component: Register,
      route: Route,
    },
    {
      path: '/account/confirm',
      name: 'Confirm',
      component: Confirm,
      route: Route,
    },
    {
      path: '/account/forget-password',
      name: 'Forget Password',
      component: ForgetPassword,
      route: Route,
    },
  ],
};

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
  let flatRoutes = [];

  routes = routes || [];
  routes.forEach((item) => {
    flatRoutes.push(item);

    if (typeof item.children !== 'undefined') {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const allRoutes = [
  rootRoute,
  dashboardRoutes,
  ...appRoutes,
  pagesRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tableRoutes,
  authRoutes,
];

const authProtectedRoutes = [
  dashboardRoutes,
  ...appRoutes,
  pagesRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tableRoutes,
];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
