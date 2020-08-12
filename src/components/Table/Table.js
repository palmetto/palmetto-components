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
  const [context] = useState(fetchDataContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortedColumn, setSortedColumn] = useState(defaultSortedColumn);
  const [startDate, setStartDate] = useState(calendarPickerConfig?.defaultDate);
  const [endDate, setEndDate] = useState();
  const [time, setTime] = useState(null);
  const [csvExported, setCsvExported] = useState(false);
  const dispatch = useDispatch();

  const columnHeaders = extractColumnAttributes(columnConfig, 'name');

  useEffect(() => {
    dispatch(fetchData({
      page: (page - 1),
      pageSize,
      sortedColumn,
      startDate,
      endDate,
      time,
      ...context
    }))
  }, [
    dispatch,
    page,
    pageSize,
    sortedColumn,
    startDate,
    endDate,
    fetchData,
    time,
    context
  ]);

  useEffect(() => {
    const exportCsv = () => {
      csvExport.unshift(columnHeaders);
      csvStringify(csvExport, (err, csv) => {
        startDate && endDate
          ? fileDownload(csv, `${tableName} ${convertJsDateToDateShort(startDate)} to ${convertJsDateToDateShort(endDate)}.csv`)
          : fileDownload(csv, `${tableName}.csv`);
      });
      setCsvExported(true);
    };
    !csvExported && columnHeaders && csvExport && exportCsv();
  }, [csvExported, tableName, csvExport, endDate, startDate, columnHeaders]);

  useEffect(() => {
    setTime(null);
  }, [startDate, endDate]);

  const handleExportCsvClick = () => {
    dispatch(fetchCsvExport(sortedColumn, startDate, endDate))
      .then(resp => {
        setCsvExported(false);
      });
  };

  const renderCalendarPicker = () => {
    return (
      <span className={styles.calenderPicker}>
        <CalendarPicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          calendarPickerConfig={calendarPickerConfig}
        />
        <FaRegCalendarAlt className={styles.calendarIcon} />
      </span>
    );
  };

  const renderTimePicker = () => {
    return (
      <TableTimePicker
        config={timePickerConfig}
        setTime={setTime}
        selectedDate={startDate}
        selectedTime={time}
      />
    );
  };

  // ToDo: What's returned from renderPageSizePicker needs to be its own component.
  const renderPageSizePicker = () => {
    const pageSizePickerOptions = [{
      label: '10',
      value: '10'
    }, {
      label: '20',
      value: '20'
    }, {
      label: '30',
      value: '30'
    }]

    return (
      <DropdownButton
        title={pageSize.toString() || "10"}
        beforeLabel="Show"
        afterLabel="per page"
        options={pageSizePickerOptions}
        onChange={setPageSize}
      />
    );
  };

  return (
    <>
      <div className={styles.tableControls}>
        {useCalendarPicker && renderCalendarPicker()}
        {useTimePicker && renderTimePicker()}
        {usePageSizePicker && renderPageSizePicker()}
        {useExportToCsv &&
          <Button className={styles.exportToCsvButton} disabled={!tableData} onClick={() => handleExportCsvClick()}>
            <FaFileDownload /> Export to CSV
          </Button>
        }
      </div>
      <div className={styles.table}>
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
        {loadingFailed &&
          <div className={styles.errorMessage}>
            <LoadingError />
          </div>
        }
        {loading &&
          <div className={styles.loadingIndicator}>
            <LoadingIndicator message="Loading..." />
          </div>
        }
        {!loading && !loadingFailed && tableData?.length === 0 &&
          <div className={styles.noDataMessage}>
            <LoadingNoData config={noDataMessageConfig} />
          </div>
        }
        {usePagination && (totalCount > pageSize) &&
          <TablePaginator
            activePage={page}
            totalItemsCount={totalCount}
            itemsPerPage={pageSize}
            onChange={setPage}
          />
        }
      </div>
    </>
  );
};


Table.defaultProps = {
  defaultSortedColumn: undefined,
  tableData: null,
  totalCount: null,
  loading: false,
  loadingFailed: false,
  fetchCsvExport: null,
  csvExport: null,
  truncateOverflow: false,
  usePagination: false,
  useCalendarPicker: false,
  useTimePicker: false,
  timePickerConfig: undefined,
  usePageSizePicker: false,
  useExportToCsv: false,
  useSortedColumns: false,
  useFixedWidthColumns: false
}

Table.propTypes = {
  tableName: PropTypes.string.isRequired,
  columnConfig: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetchDataContext: PropTypes.object,
  defaultSortedColumn: PropTypes.shape({
    columnName: PropTypes.string, // API key to sort by
    sortOrder: PropTypes.string // Sort order: asc or desc
  }),
  tableData: PropTypes.array,
  totalCount: PropTypes.number,
  loading: PropTypes.bool,
  loadingFailed: PropTypes.bool,
  noDataMessageConfig: PropTypes.shape({
    icon: PropTypes.string,
    message: PropTypes.string.isRequired
  }).isRequired,
  fetchCsvExport: PropTypes.func,
  csvExport: PropTypes.array,
  truncateOverflow: PropTypes.bool,
  usePagination: PropTypes.bool,
  useCalendarPicker: PropTypes.bool,
  calendarPickerConfig: PropTypes.shape({
    mode: PropTypes.string.isRequired, // range, single, multiple
    placeholder: PropTypes.string,
    defaultDate: PropTypes.instanceOf(Date)
  }),
  useTimePicker: PropTypes.bool,
  timePickerConfig: PropTypes.shape({
    startHour: PropTypes.number.isRequired,
    startMinute: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
    timesPerHour: PropTypes.number.isRequired
  }),
  usePageSizePicker: PropTypes.bool,
  useExportToCsv: PropTypes.bool,
  useSortedColumns: PropTypes.bool,
  useFixedWidthColumns: PropTypes.bool
};

export default Table;
