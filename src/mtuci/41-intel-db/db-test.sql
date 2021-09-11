-- LAB 1
SET search_path TO lab1;

select p.FirstName, p.LastName, a.City, a.State
FROM Person AS p LEFT OUTER JOIN Address AS a
ON p.PersonId = a.PersonId

-- LAB 2
SET search_path TO lab2;

DELETE FROM Person WHERE Id NOT IN
(SELECT * FROM (SELECT MIN(Id) FROM Person GROUP BY Email) AS de)

-- LAB 3
SET search_path TO lab3;

SELECT e.Name AS Employee
FROM Employee AS e JOIN Employee AS m
ON e.managerId = m.Id
WHERE e.Salary > m.Salary