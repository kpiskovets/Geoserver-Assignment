--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE "Address" (
    id integer NOT NULL,
    region text,
    district text,
    country text,
    street text,
    index text
);


--
-- Name: Contacts; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE "Contacts" (
    id integer NOT NULL,
    telephone text,
    email text,
    website text
);


--
-- Name: Schools; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE "Schools" (
    id integer NOT NULL,
    name text,
    president text
);


--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "Address" (id, region, district, country, street, index) FROM stdin;
32	м. Львів 	\N	\N	вул. Повстанська 24	79057
24	Львівська обл.	Сколівський р-н	с.Підгородці	вул. Степана Бандери 37	\N
1	Львівська область	Старосамбірський р-н	смт.Стрілки	\N	82092
2	м. Львів	\N	\N	вул. Порохова 3	79015
33	м. Львів 	\N	\N	вул. Замарстинівська, 132	79068
10	Рівненська обл.	\N	м.Корець	вул.Київська, 71	34700
12	Львівська обл. 	\N	м.Городок	вул. Авіаційна 122	81500
25	Тернопільська обл.	\N	м.Бучач	вул. Міцкевича 19	48403
13	Тернопільська обл.	\N	м.Бучач	вул. Лисенка 2	48403
5	Львівська обл.	Буський р-н	м.Буськ	вул. Є.Петрушевича 4	80500 
4	м.Львів	\N	\N	вул.Караджича 29	79054 
14	м.Львів 	\N	\N	вул. Наукова 90	79060
23	Львівська обл.	Яворівський р-н	смт. Івано-Франкове	вул. Івана Франка 1	81070
3	Івано-Франківська обл.	Верховинський р-н	с.Криворівня	\N	78710
15	м.Львів	\N	\N	вул.Любінська 93а	\N
6	Львівська обл.	Сокальський р-н	м. Соснівка	вул.Театральна 14а	80193
16	Тернопільська обл.	\N	смт.Козова	вул.Грушевського7	47600
7	Львівська обл.	Жовківський р-н	м.Рава-Руська	\N	81316
27	Львівська обл.	\N	м. Жидачів	вул. Грушевського 38	\N
8	Волинська обл.	\N	м.Нововолинськ	вул. Пирогова 1	\N
17	Львівська обл.	Дрогобицький р-н	м.Борислав	вул. Грушевського 29	82300
9	Львівська обл.	Сколівський р-н	с.Козьова	вул.50-ти річчя Визволення 31	82631
26	Івано-Франківська обл.	\N	м. Долина	вул. Грушевського 24	77500
28	Івано-Франківська обл.	\N	м. Косів	вул. Ярослава Мудрого 3	78600 
11	Черкаська обл.	Звенигородський р-н	с.Шевченкове	вул.Шевченка, 82	20214 
18	Львівська обл.	\N	м.Ходорів	вул. Шевченка 30	81750
19	м.Львів	\N	\N	вул. Симоненка 6	79071
21	м.Львів	\N	\N	вул. Ветеранів 11	79007
20	Львівська обл.	\N	м.Яворів	вул. Львівська 18	81000
30	м.Львів	\N	\N	вул. Гетьмана Мазепи 1а	79068
29	Івано-Франківська обл.	Богородчанський район	с. Старі Богородчани	вул. Данила Галицького 1	77712
22	Волинська обл.	\N	м.Горохів	вул. Грушевського 5а	45700
31	Львівська обл.	 Самбірський район	м. Рудки	пл. Відродження 24	81440
\.


--
-- Data for Name: Contacts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "Contacts" (id, telephone, email, website) FROM stdin;
1	\N	sckolainternat@gmail.com.ua	\N
29	(034-71) 5-12-34 	\N	\N
2	(032) 237-21-68	cg@maibuttia.lviv.ua	www.cg-lviv.org
3	(03432) 5-34-43 	\N	\N
30	(032) 294-08-44; 294-08-26 	\N	\N
4	(0322) 62-00-68	asd@lpml.com.ua	www.lpml.com.ua
31	(03236) 4-56-56	\N	\N
5	(264) 2-12-01 	busk-gymnasium@i.ua	\N
32	(032) 237-80-27, 237-79-72 (факс)	\N	http://lgmv.org.ua/
6	(03249) 3-42-01, 3-33-07 	3edcvfr4@ukr.net	chnvk-13.ucoz.ru
7	(252) 4-20-86 	mariashokalo@gmail.com	\N
33	(032) 252-05-42 	\N	\N
8	(03344) 4-90-66 	novlicey@ukr.net	novovolicey.narod.ru
9	(03-251) 3-52-81, 3-86-42 	kozovaschool@yahoo.com	kozeva.pp.ua
10	(03651) 21 739, 21 528	irasasa1@rambler.ru	\N
11	(04740) 9-53-18 	sheva2401@bigmir.net	\N
12	(231) 5-10-83	gorodok_sh4.@mail.ru	shkola-4.org.ua
13	(03544) 2-18-26 	orestrudnik@yandex.ru	\N
14	(032) 263-83-63 	school46@ua.fm	school-46.lviv.ua
15	(032) 262-20-36 	yevshan79@gmail.com	yevshan.com.ua
16	(03547) 2-16-04	gimnasium@ko.te.ua	gimn-kozova.at.ua
17	(03248) 5-07-52 	borgym@i.ua	\N
18	(03239) 5-35-89	hodorivzosh1@gmail.com	\N
19	(032) 263-22-57	nvk.symonenko@gmail.com 	www.symonenko.lviv.ua
20	(03259) 2-18-31	lemd@ukr.net 	\N
21	(032) 233-33-02 	\N	gymnasiumprestige.lviv.ua
22	(03379) 2-18-71	sofij_step@ukr.net 	\N
23	(0259) 3-35-72 	\N	\N
24	(032)513-75-15 	\N	\N
25	(03544) 2-15-49 	\N	buchachkolegium.at.ua
26	(03477) 2-58-53	gimn-internat_dol@ukr.net	\N
27	(0239)3-19-49, 3-16-97 	omalceva@gmail.com	www.zhdzchool2.16mb.com
28	(034-78)2-11-65, 2-14-56	Kosiv1.zosh@gmail.com	\N
\.


--
-- Data for Name: Schools; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "Schools" (id, name, president) FROM stdin;
1	Навчальний комплекс "Стрілківська школа-інтернат з поглибленим вивченням окремих предметів при Львівському національному університеті імені Івана Франка"	Циб Ярослав Іванович
2	Класична гімназія при Львівському національному університеті імені Івана Франка	Джала Юрій Степанович
3	Загальноосвітня школа І-ІІІ ст. імені Михайла Грушевського, с. Криворівня	Федорчак Михайло Танасійович
4	Спеціалізована школа-інтернат «Львівський фізико-математичний ліцей при Львівському національному університеті імені Івана Франка з поглибленим вивченням природничо-математичних наук»	Добосевич Мар’ян Станіславович
5	\tНавчально-виховний комплекс "Буська загальноосвітня школа І ступеня - гімназія імені Євгена Петрушевича при Львівському національному університеті імені Івана Франка"	Антонишин Ольга Степанівна
24	Підгородецька загальноосвітня школа І-ІІІ ступенів Сколівської районної ради Львівської області	Прецель Ольга Іванівна
6	Червоноградський навчально-виховний комплекс №13 Червоноградської міської ради Львівської області	Парійчук Любов Павлівна
18	Ходорівська загальноосвітня школа І-ІІІ ст. №1	Голованич Надія Антонівна
7	Навчально-виховний комплекс "Рава-руська школа-гімназія"	Данкевич Іванна Володимирівна
8	Нововолинський ліцей-інтернат Волинської обласної ради	Гутчинський Володимир Йосипович
9	Навчально-виховний комплекс "Середня загальноосвітня школа-ліцей с.Козьови при Львівському національному університеті імені Івана Франка" Сколівської районної ради	Клепуц Оксана Миколаївна
10	Корецький навчально-виховний комплекс "Школа І-ІІ ступенів-ліцей" Рівненської обл.	Даниш Людмила Йосипівна
11	\tШевченківська спеціалізована загальноосвітня школа-інтернат з поглибленим вивченням предметів гуманітарно-естетичного профілю Черкаської обласної ради	Терещенко Ліна Денисівна
12	Городоцька загальноосвітня школа І-ІІІ ступенів №4 Городоцької районної ради Львівської області	Шугало Любов Василівна
13	Бучацький ліцей	Михайлів Галина Омелянівна
19	Львівський навчально-виховний комплекс імені В.Симоненка з поглибленим вивченням німецької мови "Спеціалізована школа І ступеня - гімназія"	Скоропад Ярослава Миколаївна
14	Середня спеціалізована загальноосвітня школа № 46 імені В.Чорновола з поглибленим вивченням англійської мови м.Львова	Балаш Роман Михайлович
15	Львівська гімназія «Євшан»	Назар Божена Володимирівна
16	Козівська державна українська гімназія ім. В.Герети	Грубий Михайло Андрійович
17	Бориславська державна гімназія	Гарасимів Роксоляна Всеволодівна
20	Гімназія ім. Осипа Маковея м.Яворова	Моржин Наталія Романівна
27	Жидачівська загальноосвітня школа І-ІІІ ступенів №2 Жидачівської районної ради Львівської області	Мальцева Оксана Тадеївна
21	Львівська гімназія «Престиж» з поглибленим вивченням іноземних мов	Волошин Богдан Ярославович
25	Бучацький колегіум імені Святого Йосафата	о. Іриней Гумен, ЧСВВ
22	НВК «Загальноосвітня школа І-ІІІ ступеня-гімназія» м.Горохів	Зінчук Володимир Володимирович
23	Середня загальноосвітня школа імені Івана Франка смт. Івано-Франкове	Ліскевич-Карпа Марія Романівна
26	Долинська спеціалізована школа-інтернат І-ІІІ ступенів Долинської районної ради Івано-Франківської області	Токарська Людмила Григорівна
28	Косівська ЗОШ I – IIІ ступенів №1 ст. з поглибленим вивченням англійської мови Косівської районної ради Івано-Франківської обл.	Грималюк Галина Миколаївна
29	Старобогородчанська ЗОШ І-ІІІ ст. Богородчанської районної ради Івано-Франківської обл.	Гринишин Тарас Іванович
30	Львівська ССЗОШI-III ст. №81 ім. П.Сагайдачного з поглибленим вивченням англійської мови	Проців Богданна Миколаївна
31	Рудківська гімназія	Завійська Галина Михайлівна
32	Львівський НВК ім. В. Стуса «Спеціалізована школа І ступеня - гімназія міжнародних відносин»	Кіт Таїсія Володимирівна
33	Середня загальноосвітня школа № 78 м.Львова	Солодовнікова Ірина Іванівна
\.


--
-- Name: id_address; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY "Address"
    ADD CONSTRAINT id_address PRIMARY KEY (id);


--
-- Name: id_pk_contact; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY "Contacts"
    ADD CONSTRAINT id_pk_contact PRIMARY KEY (id);


--
-- Name: pk_id_school; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY "Schools"
    ADD CONSTRAINT pk_id_school PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

