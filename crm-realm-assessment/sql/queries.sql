SELECT id, name, email, score
FROM leads
WHERE score >= 80;

SELECT p.priority, COUNT(l.id) AS lead_count
FROM (
    SELECT 'HOT' AS priority
    UNION ALL SELECT 'WARM'
    UNION ALL SELECT 'COLD'
) AS p
LEFT JOIN (
    SELECT id,
           CASE
               WHEN score >= 80 THEN 'HOT'
               WHEN score >= 50 THEN 'WARM'
               ELSE 'COLD'
           END AS priority
    FROM leads
) AS l ON l.priority = p.priority
GROUP BY p.priority;
