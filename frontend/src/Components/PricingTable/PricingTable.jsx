import React from "react";
import "./PricingTable.css";

const PricingTable = () => {
  const pricingData = [
    {
      service: "Full-Day (8:00 AM - 6:00 PM)",
      daily: "₹800.00",
      weekly: "₹3,500.00",
      monthly: "₹12,000.00",
    },
    {
      service: "Half Day (8:00 AM - 2:00 PM or 3:00 PM - 6:00 PM)",
      daily: "₹500.00",
      weekly: "₹2,000.00",
      monthly: "₹7,000.00",
    },
    {
      service: "Food Expenses Paid Per Day",
      daily: "₹150.00",
      weekly: "₹750.00",
      monthly: "₹2,500.00",
    },
    {
      service: "Activities",
      daily: "₹100.00",
      weekly: "₹400.00",
      monthly: "₹1,500.00",
    },
  ];

  return (
    <section className="PricingTable-section">
      <div className="PricingTable-container">

        {/* =========================
            INTRODUCTION
        ========================== */}
        <div className="PricingTable-heading">
          <span className="PricingTable-label">
            Nanda Kidz Admissions
          </span>

          <h1 className="PricingTable-title">
            play school fees in bhubaneswar
          </h1>

          <p className="PricingTable-intro">
            Choosing a preschool is about more than comparing numbers.
            Parents also want to understand the learning environment,
            daily care, activities, safety and the support their child
            will receive. At Nanda Kidz – The Little Kingdom, we believe
            clear information helps families make a comfortable and
            informed decision.
          </p>
        </div>

        {/* =========================
            PRICING TABLE
        ========================== */}
        <div className="PricingTable-wrapper">
          <div className="PricingTable-table-scroll">
            <table className="PricingTable-table">
              <thead>
                <tr>
                  <th className="PricingTable-th">Preschool</th>
                  <th className="PricingTable-th">Daily</th>
                  <th className="PricingTable-th">Weekly</th>
                  <th className="PricingTable-th">Monthly</th>
                </tr>
              </thead>

              <tbody>
                {pricingData.map((row, index) => (
                  <tr
                    key={index}
                    className="PricingTable-tr"
                  >
                    <td className="PricingTable-td PricingTable-service">
                      {row.service}
                    </td>

                    <td className="PricingTable-td">
                      {row.daily}
                    </td>

                    <td className="PricingTable-td">
                      {row.weekly}
                    </td>

                    <td className="PricingTable-td">
                      {row.monthly}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================
            IMPORTANT NOTE
        ========================== */}
        <p className="PricingTable-footer-note">
          The preschool reserves the right to revise the above fees
          when required. Parents can contact the school directly for
          the latest fee details and applicable terms.
        </p>

        {/* =========================
            PARENT INFORMATION
        ========================== */}
        <div className="PricingTable-info-grid">

          <article className="PricingTable-info-card">
            <span className="PricingTable-card-number">
              01
            </span>

            <h2>Admission Age</h2>

            <p>
              Admission requirements can vary according to the program
              and child's age. Parents are encouraged to speak with
              the Nanda Kidz team to understand the suitable class,
              admission age and availability for their child.
            </p>
          </article>

          <article className="PricingTable-info-card">
            <span className="PricingTable-card-number">
              02
            </span>

            <h2>Transport</h2>

            <p>
              Families who need transport assistance can ask the school
              about available routes, pickup and drop-off arrangements,
              timings and the safety measures followed during school
              travel.
            </p>
          </article>

          <article className="PricingTable-info-card">
            <span className="PricingTable-card-number">
              03
            </span>

            <h2>Fees & Activities</h2>

            <p>
              Preschool expenses may include the learning program,
              activities, food or other services depending on the
              selected option. For current play school fees in
              Bhubaneswar, parents should confirm the latest details
              directly with the school.
            </p>
          </article>

          <article className="PricingTable-info-card">
            <span className="PricingTable-card-number">
              04
            </span>

            <h2>Safety First</h2>

            <p>
              A child's safety should always come first. Parents can
              discuss classroom supervision, entry and exit procedures,
              transport safety, emergency support and other school
              safety policies before admission.
            </p>
          </article>

        </div>

        {/* =========================
            PARENT QUESTION
        ========================== */}
        <div className="PricingTable-answer">
          <span className="PricingTable-answer-label">
            A question every parent asks
          </span>

          <h2>
            which school is best for my child?
          </h2>

          <p>
            There is no single school that is perfect for every child.
            The right choice is usually a place where your little one
            feels safe, welcomed and encouraged to learn. Parents can
            look at the school's approach to early learning, admission
            age, activities, transport, fees, hygiene and safety before
            making a decision.
          </p>

          <p>
            At Nanda Kidz – The Little Kingdom, our aim is to create a
            friendly environment where children can learn through play,
            build confidence, develop social skills and enjoy their
            first school experiences.
          </p>
        </div>

        {/* =========================
            CONTACT STRIP
        ========================== */}
        <div className="PricingTable-contact">
          <div>
            <span>Need more information?</span>
            <strong>
              Talk to Nanda Kidz about admissions and fees.
            </strong>
          </div>

          <a
            href="tel:+919438013349"
            className="PricingTable-contact-btn"
          >
            Call +91 9438013349
          </a>
        </div>

      </div>
    </section>
  );
};

export default PricingTable;