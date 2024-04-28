import sqlite3


def suitable_services(list):
    territory, age, category, services_of_interest = list['territory'], list['age'], list['category'], list['services_of_interest']
    connection = sqlite3.connect('services.db')
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM services WHERE (territory = ? OR territory = 'Кузбасс') AND (people_category LIKE '%{category}%')", (territory,))
    results = cursor.fetchall()
    print(results)
    for i in range(len(results)):
        if str(results[i][2]) not in services_of_interest:
            results.pop(i)
    r1 = []
    r2 = []
    for i in results:
        if i[2] not in r1:
            r1.append(i[2])
        r2.append({'name': i[0], 'link': i[1], 'category': i[2], 'representative': i[3]})
    return [{"categories": r1}] + r2


