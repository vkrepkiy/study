-- initial request
SELECT
  seat_no,
  amount
FROM
  boarding_passes AS a
  LEFT JOIN ticket_flights AS b ON a.ticket_no = b.ticket_no
    AND a.flight_id = b.flight_id
WHERE
  amount > 50000
ORDER BY
  amount ASC;

