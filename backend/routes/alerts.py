from fastapi import APIRouter

import database

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"]
)


@router.get("/admin")
def admin_alerts():

    alerts = database.get_admin_alerts()

    

    return alerts


@router.get("/guard/{guard_id}")
def guard_alerts(guard_id: str):

    return database.get_guard_alerts(guard_id)


@router.get("/resident/{resident_id}")
def resident_alerts(resident_id: str):

    return database.get_resident_alerts(resident_id)


@router.post("/{alert_id}/verify")
def verify_alert(alert_id: str):

    database.verify_alert(alert_id)

    return {

        "message": "Alert verified"

    }


@router.post("/{alert_id}/resolve")
def resolve_alert(alert_id: str):

    database.resolve_alert(alert_id)

    return {

        "message": "Alert resolved"

    }


@router.post("/{alert_id}/assign/{guard_id}")
def assign_guard(alert_id: str, guard_id: str):

    database.assign_guard(

        alert_id,

        guard_id

    )

    return {

        "message": "Guard assigned"

    }

