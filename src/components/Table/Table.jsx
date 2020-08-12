import React , { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import csvStringify from 'csv-stringify';
import fileDownload from 'js-file-download';
import { Table as ReactBootstrapTable, Button } from 'react-bootstrap';
import { FaFileDownload, FaRegCalendarAlt } from 'react-icons/fa';
import { extractColumnAttributes } from 'utils/tableUtils';
import { convertJsDateToDateShort } from 'utils/dateUtils';

import TableHead from 'components/common/TableHead/TableHead';
import DropdownButton from 'components/common/DropdownButton';
import CalendarPicker from 'components/common/CalendarPicker';
import TableTimePicker from 'components/common/TableTimePicker'
import TablePaginator from 'components/common/TablePaginator/TablePaginator';
import TableRow from 'components/common/TableRow/TableRow';
import LoadingIndicator from 'components/common/LoadingIndicator';
import LoadingError from 'components/common/LoadingError';
import LoadingNoData from 'components/common/LoadingNoData';

import styles from './Table.module.scss';

const Table = ({
  tableName,
  columnConfig,
  fetchData,
  fetchDataContext,
  defaultSortedColumn,
  tableData,
  totalCount,
  loading,
  loadingFailed,
  noDataMessageConfig,
  fetchCsvExport,
  csvExport,
  truncateOverflow,
  usePagination,
  useCalendarPicker,
  calendarPickerConfig,
  useTimePicker,
  timePickerConfig,
  usePageSizePicker,
  useExportToCsv,
  useSortedColumns,
  useFixedWidthColumns
}) => {
 
        <ReactBootstrapTable className={cx(styles.table, {[styles.fixedWidthColumns]: useFixedWidthColumns})} striped bordered responsive>
          <TableHead
            columns={columnConfig}
            sortedColumn={sortedColumn}
            setNewSortedColumn={setSortedColumn}
            setPage={setPage}
            loading={loading}
            useSortedColumns={useSortedColumns}
          />
          <tbody>
            {!loading && !loadingFailed && tableData && tableData.map((record, index) => <TableRow key={index} data={record} truncateOverflow={truncateOverflow}/>)}
          </tbody>
        </ReactBootstrapTable>

};

export default Table;
